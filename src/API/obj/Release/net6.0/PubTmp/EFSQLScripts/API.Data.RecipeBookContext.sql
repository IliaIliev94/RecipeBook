IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20211117010010_InitialMigration')
BEGIN
    CREATE TABLE [Users] (
        [Id] uniqueidentifier NOT NULL,
        [Username] nvarchar(50) NOT NULL,
        [Email] nvarchar(max) NOT NULL,
        [Password] nvarchar(50) NOT NULL,
        CONSTRAINT [PK_Users] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20211117010010_InitialMigration')
BEGIN
    CREATE TABLE [Recipes] (
        [Id] uniqueidentifier NOT NULL,
        [Title] nvarchar(200) NOT NULL,
        [Description] nvarchar(max) NULL,
        [MinMinutes] int NULL,
        [MaxMinutes] int NULL,
        [UserId] uniqueidentifier NOT NULL,
        CONSTRAINT [PK_Recipes] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Recipes_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20211117010010_InitialMigration')
BEGIN
    CREATE INDEX [IX_Recipes_UserId] ON [Recipes] ([UserId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20211117010010_InitialMigration')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20211117010010_InitialMigration', N'6.0.1');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20211118174016_AddedImageURIPropertyToRecipeModel')
BEGIN
    ALTER TABLE [Recipes] ADD [ImageURI] nvarchar(max) NOT NULL DEFAULT N'';
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20211118174016_AddedImageURIPropertyToRecipeModel')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20211118174016_AddedImageURIPropertyToRecipeModel', N'6.0.1');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20211129114706_MadeUsernameAndEmailUniqueAndRemovedPasswordLengthConstriction')
BEGIN
    DECLARE @var0 sysname;
    SELECT @var0 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Users]') AND [c].[name] = N'Password');
    IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [Users] DROP CONSTRAINT [' + @var0 + '];');
    ALTER TABLE [Users] ALTER COLUMN [Password] nvarchar(max) NOT NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20211129114706_MadeUsernameAndEmailUniqueAndRemovedPasswordLengthConstriction')
BEGIN
    DECLARE @var1 sysname;
    SELECT @var1 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Users]') AND [c].[name] = N'Email');
    IF @var1 IS NOT NULL EXEC(N'ALTER TABLE [Users] DROP CONSTRAINT [' + @var1 + '];');
    ALTER TABLE [Users] ALTER COLUMN [Email] nvarchar(450) NOT NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20211129114706_MadeUsernameAndEmailUniqueAndRemovedPasswordLengthConstriction')
BEGIN
    CREATE UNIQUE INDEX [IX_Users_Email] ON [Users] ([Email]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20211129114706_MadeUsernameAndEmailUniqueAndRemovedPasswordLengthConstriction')
BEGIN
    CREATE UNIQUE INDEX [IX_Users_Username] ON [Users] ([Username]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20211129114706_MadeUsernameAndEmailUniqueAndRemovedPasswordLengthConstriction')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20211129114706_MadeUsernameAndEmailUniqueAndRemovedPasswordLengthConstriction', N'6.0.1');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20211204004844_AddedImageNameToUserModel')
BEGIN
    ALTER TABLE [Users] ADD [ImageName] nvarchar(max) NOT NULL DEFAULT N'';
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20211204004844_AddedImageNameToUserModel')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20211204004844_AddedImageNameToUserModel', N'6.0.1');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20211209193842_AddedRecipeLikes')
BEGIN
    DECLARE @var2 sysname;
    SELECT @var2 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Recipes]') AND [c].[name] = N'MinMinutes');
    IF @var2 IS NOT NULL EXEC(N'ALTER TABLE [Recipes] DROP CONSTRAINT [' + @var2 + '];');
    ALTER TABLE [Recipes] ALTER COLUMN [MinMinutes] int NOT NULL;
    ALTER TABLE [Recipes] ADD DEFAULT 0 FOR [MinMinutes];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20211209193842_AddedRecipeLikes')
BEGIN
    DECLARE @var3 sysname;
    SELECT @var3 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Recipes]') AND [c].[name] = N'MaxMinutes');
    IF @var3 IS NOT NULL EXEC(N'ALTER TABLE [Recipes] DROP CONSTRAINT [' + @var3 + '];');
    ALTER TABLE [Recipes] ALTER COLUMN [MaxMinutes] int NOT NULL;
    ALTER TABLE [Recipes] ADD DEFAULT 0 FOR [MaxMinutes];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20211209193842_AddedRecipeLikes')
BEGIN
    CREATE TABLE [Likes] (
        [RecipeId] uniqueidentifier NOT NULL,
        [UserId] uniqueidentifier NOT NULL,
        CONSTRAINT [PK_Likes] PRIMARY KEY ([UserId], [RecipeId]),
        CONSTRAINT [FK_Likes_Recipes_RecipeId] FOREIGN KEY ([RecipeId]) REFERENCES [Recipes] ([Id]),
        CONSTRAINT [FK_Likes_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20211209193842_AddedRecipeLikes')
BEGIN
    CREATE INDEX [IX_Likes_RecipeId] ON [Likes] ([RecipeId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20211209193842_AddedRecipeLikes')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20211209193842_AddedRecipeLikes', N'6.0.1');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20211211232932_AddedCommentEntity')
BEGIN
    CREATE TABLE [Comments] (
        [Id] uniqueidentifier NOT NULL,
        [Message] nvarchar(500) NOT NULL,
        [Date] datetime2 NOT NULL,
        [UserId] uniqueidentifier NOT NULL,
        [RecipeId] uniqueidentifier NOT NULL,
        CONSTRAINT [PK_Comments] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Comments_Recipes_RecipeId] FOREIGN KEY ([RecipeId]) REFERENCES [Recipes] ([Id]),
        CONSTRAINT [FK_Comments_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20211211232932_AddedCommentEntity')
BEGIN
    CREATE INDEX [IX_Comments_RecipeId] ON [Comments] ([RecipeId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20211211232932_AddedCommentEntity')
BEGIN
    CREATE INDEX [IX_Comments_UserId] ON [Comments] ([UserId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20211211232932_AddedCommentEntity')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20211211232932_AddedCommentEntity', N'6.0.1');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20211217140851_ChangedSetNullToLikes')
BEGIN
    ALTER TABLE [Likes] DROP CONSTRAINT [FK_Likes_Recipes_RecipeId];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20211217140851_ChangedSetNullToLikes')
BEGIN
    ALTER TABLE [Likes] DROP CONSTRAINT [FK_Likes_Users_UserId];
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20211217140851_ChangedSetNullToLikes')
BEGIN
    ALTER TABLE [Likes] ADD CONSTRAINT [FK_Likes_Recipes_RecipeId] FOREIGN KEY ([RecipeId]) REFERENCES [Recipes] ([Id]) ON DELETE CASCADE;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20211217140851_ChangedSetNullToLikes')
BEGIN
    ALTER TABLE [Likes] ADD CONSTRAINT [FK_Likes_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [Users] ([Id]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20211217140851_ChangedSetNullToLikes')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20211217140851_ChangedSetNullToLikes', N'6.0.1');
END;
GO

COMMIT;
GO

