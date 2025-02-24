CREATE TABLE `plans` (
	`id` integer PRIMARY KEY NOT NULL,
	`name_plan` text NOT NULL,
	`description` text NOT NULL,
	`duration` integer NOT NULL,
	`price` integer NOT NULL,
	`stripePriceId` text NOT NULL,
	`stripeProductId` text NOT NULL,
	`status` text DEFAULT 'available' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `plans_name_plan_unique` ON `plans` (`name_plan`);--> statement-breakpoint
CREATE UNIQUE INDEX `plans_duration_unique` ON `plans` (`duration`);--> statement-breakpoint
DROP INDEX "plans_name_plan_unique";--> statement-breakpoint
DROP INDEX "plans_duration_unique";--> statement-breakpoint
DROP INDEX "users_email_unique";--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "password" TO "password" text DEFAULT '';--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "created_at" TO "created_at" text NOT NULL DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `users` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `users` ADD `hash` text;--> statement-breakpoint
ALTER TABLE `users` ADD `hashedRt` text;