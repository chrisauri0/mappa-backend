DROP INDEX "plans_name_plan_unique";--> statement-breakpoint
DROP INDEX "plans_duration_unique";--> statement-breakpoint
DROP INDEX "users_email_unique";--> statement-breakpoint
ALTER TABLE `user_plans` ALTER COLUMN "start_date" TO "start_date" text DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
CREATE UNIQUE INDEX `plans_name_plan_unique` ON `plans` (`name_plan`);--> statement-breakpoint
CREATE UNIQUE INDEX `plans_duration_unique` ON `plans` (`duration`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
ALTER TABLE `user_plans` ADD `user_name` text;--> statement-breakpoint
ALTER TABLE `user_plans` ADD `plan_name` text;