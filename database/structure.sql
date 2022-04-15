CREATE SCHEMA social_me;

DROP TABLE IF EXISTS social_me.users;
CREATE TABLE IF NOT EXISTS social_me.users (
    id SERIAL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(191) NOT NULL,
    CONSTRAINT socialme_users_id_key UNIQUE (id),
    CONSTRAINT socialme_users_email_pk PRIMARY KEY (email)
);

DROP TABLE IF EXISTS social_me.posts;
CREATE TABLE IF NOT EXISTS social_me.posts (
    id SERIAL,
    user_id INTEGER NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    views INT DEFAULT 0,
    CONSTRAINT socialme_posts_id_key UNIQUE (id),
    CONSTRAINT socialme_posts_user_id_fk
        FOREIGN KEY (user_id)
        REFERENCES social_me.users(id)
        ON DELETE CASCADE
);
CREATE TRIGGER social_me_posts_audit
    AFTER UPDATE ON social_me.posts
    FOR EACH ROW
    EXECUTE PROCEDURE audit_posts_trigger_function();

DROP TABLE IF EXISTS social_me.audit_posts;
CREATE TABLE IF NOT EXISTS social_me.audit_posts (
    id SERIAL,
    update_timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    post_id INTEGER NOT NULL,
    old_title VARCHAR(100) NOT NULL,
    new_title VARCHAR(100) NOT NULL,
    old_description TEXT NOT NULL,
    new_description TEXT NOT NULL,
    CONSTRAINT socialme_audit_posts_id_key UNIQUE (id)
);

DROP TABLE IF EXISTS social_me.comments;
CREATE TABLE IF NOT EXISTS social_me.comments (
    id SERIAL,
    post_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    description TEXT NOT NULL,
    deleted_by comment_deleted_by_type DEFAULT NULL,
    CONSTRAINT socialme_comments_id_key UNIQUE (id),
    CONSTRAINT socialme_comments_post_id_fk
        FOREIGN KEY (post_id)
        REFERENCES social_me.posts(id)
        ON DELETE CASCADE,
    CONSTRAINT socialme_comments_user_id_fk
        FOREIGN KEY (user_id)
        REFERENCES social_me.users(id)
        ON DELETE CASCADE,
    CONSTRAINT socialme_comments_deleted_by_fk
        FOREIGN KEY (deleted_by)
        REFERENCES social_me.users(id)
        ON DELETE CASCADE
);

DROP TABLE IF EXISTS social_me.likes;
CREATE TABLE IF NOT EXISTS social_me.likes (
    id SERIAL,
    post_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    CONSTRAINT socialme_likes_id_key UNIQUE (id),
    CONSTRAINT socialme_likes_post_id_fk
        FOREIGN KEY (post_id)
        REFERENCES social_me.posts(id)
        ON DELETE CASCADE,
    CONSTRAINT socialme_likes_user_id_fk
        FOREIGN KEY (user_id)
        REFERENCES social_me.users(id)
        ON DELETE CASCADE
);

DROP TABLE IF EXISTS social_me.dislikes;
CREATE TABLE IF NOT EXISTS social_me.dislikes (
    id SERIAL,
    post_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    CONSTRAINT socialme_dislikes_id_key UNIQUE (id),
    CONSTRAINT socialme_dislikes_post_id_fk
        FOREIGN KEY (post_id)
        REFERENCES social_me.posts(id),
    CONSTRAINT socialme_dislikes_user_id_fk
        FOREIGN KEY (user_id)
        REFERENCES social_me.users(id)
);
