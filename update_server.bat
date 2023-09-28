@echo off
setlocal

set scriptDir=%~dp0
set sourceDir=%scriptDir%
set destinationDir=C:\bedrock

xcopy "%sourceDir%\development_behavior_packs" "%destinationDir%" /E /I /Y
xcopy "%sourceDir%\development_resource_packs" "%destinationDir%" /E /I /Y

echo Directories copied successfully.
pause
