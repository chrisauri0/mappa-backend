DROP INDEX "plans_name_plan_unique";--> statement-breakpoint
DROP INDEX "plans_duration_unique";--> statement-breakpoint
DROP INDEX "users_email_unique";--> statement-breakpoint
ALTER TABLE `user_plans` ALTER COLUMN "compras" TO "compras" integer NOT NULL DEFAULT 1;--> statement-breakpoint
CREATE UNIQUE INDEX `plans_name_plan_unique` ON `plans` (`name_plan`);--> statement-breakpoint
CREATE UNIQUE INDEX `plans_duration_unique` ON `plans` (`duration`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
ALTER TABLE `user_plans` ADD `plan_price` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `user_plans` DROP COLUMN `start_date`;--> statement-breakpoint
ALTER TABLE `user_plans` DROP COLUMN `end_date`;--> statement-breakpoint
ALTER TABLE `user_plans` DROP COLUMN `status`;--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "password" TO "password" text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `code_activation` text DEFAULT (hex(randomblob(16)));--> statement-breakpoint
ALTER TABLE `users` ADD `status` text DEFAULT 'inactive' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `hash`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `hashedRt`;