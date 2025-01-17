import { world, EntityTypes } from "@minecraft/server";

world.afterEvents.entityDie.subscribe((eventData) => {
    const deadEntity = eventData.deadEntity;
    const killer = eventData.damageSource.damagingEntity;

    // Ensure the dead entity is your custom entity
    if (deadEntity.typeId === "nate:infinite_chicken") {
        // Check if the killer exists and is a player
        if (killer && killer.isValid && killer.typeId === "minecraft:player") {

                const position = deadEntity.location;
                // Spawn two smaller versions
                for (let i = 0; i < 2; i++) {
                    const offset = (i === 0 ? 0.5 : -0.5);
                    deadEntity.dimension.spawnEntity("nate:infinite_chicken", {
                        x: position.x + offset,
                        y: position.y,
                        z: position.z
                    });
                }
        } 
    }
});