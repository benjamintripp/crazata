import json
import sys


raw_version = sys.argv[1]
version = raw_version.split('.')

print("Upgrading Resource Pack")
with open('development_resource_packs\\nates_pack_RP\\manifest.json', 'r') as json_file:
    data = json.load(json_file)
    data['header']['version'] = version
    data['modules'][0]['version'] = version
with open('development_resource_packs\\nates_pack_RP\\manifest.json', 'w') as json_file:
    json.dump(data, json_file, indent=4)

print("Upgrading Behavior Pack")
with open('development_behavior_packs\\nates_pack_BP\\manifest.json', 'r') as json_file:
    data = json.load(json_file)
    data['header']['version'] = version
    data['modules'][0]['version'] = version
    data['dependencies'][0]['version'] = version
with open('development_behavior_packs\\nates_pack_BP\\manifest.json', 'w') as json_file:
    json.dump(data, json_file, indent=4)

print("Upgrading Skin Pack")
with open('skin_packs\\nates_sp\\manifest.json', 'r') as json_file:
    data = json.load(json_file)
    data['header']['version'] = version
    data['modules'][0]['version'] = version
with open('skin_packs\\nates_sp\\manifest.json', 'w') as json_file:
    json.dump(data, json_file, indent=4)