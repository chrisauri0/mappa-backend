DROP INDEX "plans_name_plan_unique";--> statement-breakpoint
DROP INDEX "plans_duration_unique";--> statement-breakpoint
DROP INDEX "users_email_unique";--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "name" TO "name" text;--> statement-breakpoint
CREATE UNIQUE INDEX `plans_name_plan_unique` ON `plans` (`name_plan`);--> statement-breakpoint
CREATE UNIQUE INDEX `plans_duration_unique` ON `plans` (`duration`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);