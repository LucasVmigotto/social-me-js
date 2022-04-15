CREATE OR REPLACE FUNCTION audit_posts_trigger_function()
    RETURNS TRIGGER AS $audit_posts_trigger$
    BEGIN

        IF (TG_OP = 'UPDATE') THEN

            EXECUTE
                'INSERT INTO '
                || 'social_me.audit_posts ('
                || '    post_id,'
                || '    old_title,'
                || '    new_title,'
                || '    old_description,'
                || '    new_description'
                || ') VALUES ('
                || '    $1,'
                || '    $2,'
                || '    $3,'
                || '    $4,'
                || '    $5'
                || ')'
            USING
                OLD.id,
                OLD.title,
                NEW.title,
                OLD.description,
                NEW.description;

        END IF;

        RETURN NULL;

    END;

$audit_posts_trigger$ LANGUAGE plpgsql;
