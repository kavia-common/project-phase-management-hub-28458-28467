#!/bin/bash
cd /home/kavia/workspace/code-generation/project-phase-management-hub-28458-28467/project_hub_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

