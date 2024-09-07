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
            y: playerPosition.y + 1.2,  // Approximate hand level
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
            arg.hitEntity.addEffect("poison", 100)
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

    //for bouncu sword
    initEvent.itemComponentRegistry.registerCustomComponent("nate:bounce", {
        onHitEntity(arg) {
            arg.hitEntity.applyKnockback(0,0,0,3)
        },
    });

    //for yeet sword
    initEvent.itemComponentRegistry.registerCustomComponent("nate:yeet", {
        onHitEntity(arg) {

            const lookDirection = arg.attackingEntity.getViewDirection();
            arg.hitEntity.applyKnockback(lookDirection.x,lookDirection.z,8,1)
        },
    });

    //for medicinal bat
    initEvent.itemComponentRegistry.registerCustomComponent("nate:bat", {
        onHitEntity(arg) {
            const current = arg.hitEntity.getComponent(EntityComponentTypes.Health).currentValue
            arg.hitEntity.getComponent(EntityComponentTypes.Health).setCurrentValue(current + 5)
        },
    });
    



});
