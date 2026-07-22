ALTER TABLE `two_factor` ADD COLUMN `verified` boolean NOT NULL DEFAULT true;
ALTER TABLE `two_factor` ADD COLUMN `failed_verification_count` int NOT NULL DEFAULT 0;
ALTER TABLE `two_factor` ADD COLUMN `locked_until` datetime;
