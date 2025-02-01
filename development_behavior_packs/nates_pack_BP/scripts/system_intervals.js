import { world, system } from "@minecraft/server";

function freeze() {
    const entities = world.getEntities({});
    world.getEntities()
    for (const entity of entities) {
        const freezeStart = entity.getDynamicProperty("freeze_start");

        if (freezeStart !== undefined) {
            if (system.currentTick - freezeStart >= 100) {
                // Unfreeze the entity after 5 seconds (100 ticks)
                entity.removeEffect("minecraft:slowness");
                entity.setDynamicProperty("freeze_start", undefined);
                continue; // Skip to next entity
            }

            // Apply damage if the method exists
            if (typeof entity.applyDamage === "function") {
                entity.applyDamage(1);
            }

            // Spawn snowflake particles if the entity has a valid dimension
            if (entity.dimension) {
                entity.dimension.spawnParticle("minecraft:snowflake", entity.location);
            }
        }
    }
}

// Run every second (20 ticks)
system.runInterval(freeze, 20);
