CREATE OR REPLACE FUNCTION audit_posts_trigger_function()
    RETURNS TRIGGER AS $audit_posts_trigger$
    BEGIN

        IF (TG_OP = 'UPDATE') THEN

            EXECUTE
                'INSERT INTO '
                || 'social_me.audit_posts ('
                || '    old_title,'
                || '    new_title,'
                || '    old_description,'
                || '    new_description'
                || ') VALUES ('
                || '    $1,'
                || '    $2,'
                || '    $3,'
                || '    $4'
                || ')'
            USING
                OLD.title,
                NEW.title,
                OLD.description,
                NEW.description;

        END IF;

        RETURN NULL;

    END;

$audit_posts_trigger$ LANGUAGE plpgsql;
