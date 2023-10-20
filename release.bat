@echo off
setlocal


rem Output directory
set "output_dir=releases"

rem Delete all existing files in the output directory
del /Q "%output_dir%\*.*"


rem ------------------------



rem Source directory
set "source_dir=development_resource_packs\nates_pack_RP"


rem Output file name (temporarily as .zip)
set "temp_output_file=nates_pack_RP.zip"

rem Final output file name
set "output_file=nates_pack_RP.mcpack"

rem Ensure the output directory exists
if not exist "%output_dir%" mkdir "%output_dir%"

rem Create the temporary MCPack zip file
cd "%source_dir%" || exit /b 1
powershell -command "Compress-Archive -Path * -DestinationPath '..\..\%output_dir%\%temp_output_file%'"
cd ..\..

rem Rename the temporary .zip to .mcpack
ren "%output_dir%\%temp_output_file%" "%output_file%"

echo Created %output_dir%\%output_file%

rem ------------------------

rem Source directory
set "source_dir=development_behavior_packs\nates_pack_BP"

rem Output file name (temporarily as .zip)
set "temp_output_file=nates_pack_BP.zip"

rem Final output file name
set "output_file=nates_pack_BP.mcpack"

rem Ensure the output directory exists
if not exist "%output_dir%" mkdir "%output_dir%"

rem Create the temporary MCPack zip file
cd "%source_dir%" || exit /b 1
powershell -command "Compress-Archive -Path * -DestinationPath '..\..\%output_dir%\%temp_output_file%'"
cd ..\..

rem Rename the temporary .zip to .mcpack
ren "%output_dir%\%temp_output_file%" "%output_file%"

echo Created %output_dir%\%output_file%

rem ------------------------

rem Source directory
set "source_dir=skin_packs\nates_sp"

rem Output file name (temporarily as .zip)
set "temp_output_file=nates_sp.zip"

rem Final output file name
set "output_file=nates_sp.mcpack"

rem Ensure the output directory exists
if not exist "%output_dir%" mkdir "%output_dir%"

rem Create the temporary MCPack zip file
cd "%source_dir%" || exit /b 1
powershell -command "Compress-Archive -Path * -DestinationPath '..\..\%output_dir%\%temp_output_file%'"
cd ..\..

rem Rename the temporary .zip to .mcpack
ren "%output_dir%\%temp_output_file%" "%output_file%"

echo Created %output_dir%\%output_file%

rem ------------------------

@echo off
setlocal

rem Input directory containing .mcpack files
set "input_dir=releases"

rem Output .zip file name
set "zip_file=crazata.zip"

rem Final .mcaddon file name
set "mcaddon_file=crazata.mcaddon"

rem Ensure the input directory exists
if not exist "%input_dir%" (
    echo Input directory "%input_dir%" does not exist.
    exit /b 1
)

rem Ensure there are .mcpack files in the input directory
for %%i in ("%input_dir%\*.mcpack") do set "has_mcpack_files=1"
if not defined has_mcpack_files (
    echo No .mcpack files found in "%input_dir%".
    exit /b 1
)


rem Add all .mcpack files to a new .zip
powershell -command "Compress-Archive -Path '%input_dir%\*.mcpack' -DestinationPath '%input_dir%\%zip_file%'"

rem Rename the .zip to .mcaddon
ren "%input_dir%\%zip_file%" "%mcaddon_file%"

rem Delete the original .mcpack files
del /Q "%input_dir%\*.mcpack"

echo Created %mcaddon_file%
