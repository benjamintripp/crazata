import { world, EntityComponentTypes } from "@minecraft/server";

world.beforeEvents.worldInitialize.subscribe((initEvent) => {

    //for thunder blade
    initEvent.itemComponentRegistry.registerCustomComponent("nate:thunder_blast", {
        onHitEntity(arg) {
            arg.attackingEntity.runCommand('weather thunder 300');
            arg.attackingEntity.runCommand('summon lightning_bolt ^ ^ ^3');
        },
    });

    //for bee blade
    initEvent.itemComponentRegistry.registerCustomComponent("nate:buzz", {
        onHitEntity(arg) {
            const randomValue = Math.random();
            if (randomValue <= 0.25) {
                arg.attackingEntity.runCommand('summon bee ^ ^2 ^');
            }
        },
    });


    function shootProjectile(entity, projectileType, launchPower = 15) {
        const playerPosition = entity.location;
        const lookDirection = entity.getViewDirection();
    
        // Calculate the spawn position roughly at the sword's hand position
        const spawnPosition = {
            x: playerPosition.x + lookDirection.x * 0.8, // Slightly in front of the player
            y: playerPosition.y + 1.3,  // Approximate hand level
            z: playerPosition.z + lookDirection.z * 0.8
        };
    
        // Spawn the specified projectile
        
        const projectile = entity.dimension.spawnEntity(projectileType, spawnPosition);
    
        // Set the projectile's velocity
        projectile.applyImpulse({
            x: lookDirection.x * launchPower,
            y: lookDirection.y * launchPower,
            z: lookDirection.z * launchPower
        });

    }

    //for arrow sword
    initEvent.itemComponentRegistry.registerCustomComponent("nate:shoot_arrow", {
        onUse(arg) {
            const player = arg.source;
            shootProjectile(player,"minecraft:arrow")
        }
    });

    //for chicken sword
    initEvent.itemComponentRegistry.registerCustomComponent("nate:shoot_egg", {
        onUse(arg) {
            const player = arg.source;
            shootProjectile(player,"minecraft:egg", 2)
        }
    });

    initEvent.itemComponentRegistry.registerCustomComponent("nate:shoot_brick", {
        onUse(arg) {
            const player = arg.source;
            shootProjectile(player,"nate:brick", 1.5)
        }
    });

    initEvent.itemComponentRegistry.registerCustomComponent("nate:summon_chicken", {
        onHitEntity(arg) {
            const randomValue = Math.random();
            if (randomValue <= 0.25) {
                arg.attackingEntity.runCommand('summon chicken ^ ^2 ^');
            }
        },
    });

    //for golden ender dragon sword
    initEvent.itemComponentRegistry.registerCustomComponent("nate:heal", {
        onHitEntity(arg) {
            arg.attackingEntity.getComponent(EntityComponentTypes.Health).resetToMaxValue();
        },
    });

    //for sapphire sword
    initEvent.itemComponentRegistry.registerCustomComponent("nate:poison", {
        onHitEntity(arg) {
            arg.hitEntity.addEffect("poison", 20000000)
        },
    });
    
    //for rainbow sword
    initEvent.itemComponentRegistry.registerCustomComponent("nate:color", {
        onHitEntity(arg) {
            arg.attackingEntity.runCommand('setblock ^ ^1 ^1 red_wool');
            arg.attackingEntity.runCommand('setblock ^ ^2 ^2 orange_wool');
            arg.attackingEntity.runCommand('setblock ^ ^3 ^3 yellow_wool');
            arg.attackingEntity.runCommand('setblock ^ ^4 ^4 lime_wool');
            arg.attackingEntity.runCommand('setblock ^ ^5 ^5 blue_wool');
            arg.attackingEntity.runCommand('setblock ^ ^6 ^6 purple_wool');
            arg.attackingEntity.runCommand('setblock ^ ^7 ^7 magenta_wool');
        },
    });

    //for nether wand
    initEvent.itemComponentRegistry.registerCustomComponent("nate:portal", {
        onUse(arg) {
            arg.source.runCommand('setblock ^ ^2 ^5 portal');
        },
    });

    //for powy
    initEvent.itemComponentRegistry.registerCustomComponent("nate:lava", {
        onHitEntity(arg) {
            arg.attackingEntity.runCommand('setblock ~ ~ ~ lava');
        },
    });

    //for power sword
    initEvent.itemComponentRegistry.registerCustomComponent("nate:slime", {
        onHitEntity(arg) {
            arg.attackingEntity.runCommand('setblock ^ ^2 ^1 slime');
        },
    });

    //for pow sword
    initEvent.itemComponentRegistry.registerCustomComponent("nate:flood", {
        onHitEntity(arg) {
            arg.attackingEntity.runCommand('setblock ~ ~ ~ water');
        },
    });

    //for friend finder
    initEvent.itemComponentRegistry.registerCustomComponent("nate:teleport", {
        onUse(arg) {
            arg.source.runCommand('tp @s @r');
        },
    });
    

    //for chicken hammer
    initEvent.itemComponentRegistry.registerCustomComponent("nate:summon_mega_chicken", {
        onHitEntity(arg) {
            const randomValue = Math.random();
            if (randomValue <= 0.25) {
                arg.attackingEntity.runCommand('summon nate:mega_chicken ^2 ^ ^');
            }
        },
    });

    //for ultra sword
    initEvent.itemComponentRegistry.registerCustomComponent("nate:freeze", {
        onHitEntity(arg) {
            arg.attackingEntity.runCommand('setblock ^ ^-1 ^ ice');
        },
    });

    //for bouncy sword
    initEvent.itemComponentRegistry.registerCustomComponent("nate:bounce", {
        onHitEntity(arg) {
            arg.hitEntity.applyKnockback(0,0,0,3)
        },
    });

    //for baseball bat
    initEvent.itemComponentRegistry.registerCustomComponent("nate:bat", {
        onHitEntity(arg) {

            const lookDirection = arg.attackingEntity.getViewDirection();
            arg.hitEntity.applyKnockback(lookDirection.x,lookDirection.z,15,1)
        },
    });

    //for medicinal bat
    initEvent.itemComponentRegistry.registerCustomComponent("nate:healsword", {
        onHitEntity(arg) {
            const current = arg.hitEntity.getComponent(EntityComponentTypes.Health).currentValue
            arg.hitEntity.getComponent(EntityComponentTypes.Health).setCurrentValue(current + 5)
        },
    });
    
    //for chicken wand
    initEvent.itemComponentRegistry.registerCustomComponent("nate:chickenify", {
        onHitEntity(arg) {
            const hitEntity = arg.hitEntity;

            // Check if the hit entity is a player, skip if true
            if (hitEntity.typeId === "minecraft:player") {
                return;
            }

            // Get the location and rotation of the hit entity
            const location = hitEntity.location;
            const viewDirection = hitEntity.getRotation();

            // Get the name tag or type of the hit entity for naming the chicken
            const nameTag = hitEntity.nameTag;

            const dimension = hitEntity.dimension;

            hitEntity.remove();

            
            // Spawn a chicken in the same location
            const chicken = dimension.spawnEntity("minecraft:chicken", location);

            if (chicken) {
                // Set the chicken's name to the hit entity's name
                if (nameTag) {
                    chicken.nameTag = nameTag;
                }
            
                // Set the chicken's rotation to match the hit entity
                chicken.setRotation(viewDirection);
            }
        },
    });
    

    initEvent.blockComponentRegistry.registerCustomComponent("nate:bounce_block", {

        onStepOn(arg) {
            if (arg.entity.hasComponent("minecraft:health"))
            {
                arg.entity.applyKnockback(0,0,0,3)
            }

        }
    });

    initEvent.blockComponentRegistry.registerCustomComponent("nate:speed_boost", {

        onStepOn(arg) {
            if (arg.entity.typeId == "minecraft:player")
            {   
                arg.entity.sendMessage("Speed Boost. Toggle sprint/walk to disable.");
                const speed = arg.entity.getComponent(EntityComponentTypes.Movement).currentValue
                arg.entity.getComponent(EntityComponentTypes.Movement).setCurrentValue(speed * 2)
            }

        }
    });

    //for nether sword
    initEvent.itemComponentRegistry.registerCustomComponent("nate:netherzap", {
        onHitEntity(arg) {
            
            const currentDimension = arg.hitEntity.dimension.id;
            const currLocation =  arg.hitEntity.location;
            var destX;
            var destY;
            var destZ;
            var destDimension;
            // Ensure the current dimension is the Overworld
            if (currentDimension === "minecraft:overworld") {

                destX = Math.floor(currLocation.x / 8);
                 destY = currLocation.y; // Keep Y coordinate unchanged
                 destZ = Math.floor(currLocation.z / 8);
                
                 destDimension = world.getDimension("minecraft:nether");

            } else if (currentDimension === "minecraft:nether") {

                destX = Math.floor(currLocation.x) * 8;
                 destY = currLocation.y; // Keep Y coordinate unchanged
                 destZ = Math.floor(currLocation.z) * 8;
                
                 destDimension = world.getDimension("minecraft:overworld");

            }

            if (currentDimension !== "minecraft:the_end") {
                arg.hitEntity.teleport(
                    { x: destX, y: destY, z: destZ },
                    { dimension: destDimension }
                );
            }


        },
    });
    
    //for speedy sword
    initEvent.itemComponentRegistry.registerCustomComponent("nate:speedy", {
        onHitEntity(arg) {
            const speed = arg.hitEntity.getComponent(EntityComponentTypes.Movement).currentValue
            arg.hitEntity.getComponent(EntityComponentTypes.Movement).setCurrentValue(speed * 2)
        },
    });

    //for slow sword
    initEvent.itemComponentRegistry.registerCustomComponent("nate:slow", {
        onHitEntity(arg) {
            const speed = arg.hitEntity.getComponent(EntityComponentTypes.Movement).currentValue
            arg.hitEntity.getComponent(EntityComponentTypes.Movement).setCurrentValue(speed / 2)
        },
    });

        //for stop sword
        initEvent.itemComponentRegistry.registerCustomComponent("nate:stop", {
            onHitEntity(arg) {
                arg.hitEntity.getComponent(EntityComponentTypes.Movement).setCurrentValue(0)
            },
        });
    


});
