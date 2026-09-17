#!/bin/zsh
# Guarded driver for the Envato phone mockups.
#
# Two constraints are inherited from sunbird-kit/ps-scripts/run-pattern-jobs.sh,
# both learned the expensive way:
#   1. ONE job per Photoshop invocation. These PSDs are 107-118MB; a session
#      that keeps several open drives swap into the gigabytes.
#   2. The AppleEvent must be wrapped in `with timeout`. The default is two
#      minutes and a smart-object replace on a 4500x3000 document exceeds it,
#      which surfaces as -1712 "AppleEvent timed out" rather than as an error
#      from Photoshop.
#
# Jobs file: one per line, pipe separated —
#   psd|art.png|out.png|so indices|solo group|trim margin|keep background
ROOT=/Users/tomsesler/Projects/portfolio
JOBS=${1:-$ROOT/.ps-run/screen-jobs.txt}
LOG=$ROOT/.ps-run/screen-jobs.log
: > $LOG

free_gb=$(df -g / | tail -1 | awk '{print $4}')
if [ "$free_gb" -lt 10 ]; then echo "ABORT: ${free_gb}Gi free, need 10" | tee -a $LOG; exit 1; fi
free_pct=$(memory_pressure | awk '/free percentage/ {gsub("%","");print $NF}')
if [ "${free_pct:-0}" -lt 15 ]; then echo "ABORT: ${free_pct}% memory free, need 15" | tee -a $LOG; exit 1; fi
echo "start: ${free_gb}Gi disk, ${free_pct}% memory free" | tee -a $LOG

while IFS='|' read -r psd art out idx solo margin bg; do
  [ -z "$psd" ] && continue
  case "$psd" in \#*) continue;; esac
  printf '%s\n%s\n%s\n%s\n%s\n%s\n%s\n' "$psd" "$art" "$out" "$idx" "${solo:--1}" "${margin:--1}" "${bg:-1}" \
    > $ROOT/.ps-run/screen-job.txt
  echo "job: $(basename $out)" | tee -a $LOG
  res=$(osascript -e "tell application \"Adobe Photoshop 2026\"
    with timeout of 900 seconds
      do javascript (read (POSIX file \"$ROOT/scripts/ps/one-screen-job.jsx\") as «class utf8»)
    end timeout
  end tell" 2>&1 | tail -1)
  echo "  -> $res" | tee -a $LOG
  sleep 4
done < $JOBS
echo "DONE" | tee -a $LOG
