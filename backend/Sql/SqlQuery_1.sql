CREATE TABLE [dbo].[Quizzes] (
    [Id]      INT            IDENTITY (1, 1) NOT NULL,
    [Title]   NVARCHAR (MAX) NULL,
    [Level]   NVARCHAR (MAX) NULL,
    [OwnerId] NVARCHAR (MAX) NULL,
    CONSTRAINT [PK_Quizzes] PRIMARY KEY CLUSTERED ([Id] ASC)
);