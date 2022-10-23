
CREATE POLICY "Public Read on Game Session"
ON public.game_session
AS PERMISSIVE FOR SELECT
TO public
USING ( true );

CREATE POLICY "Public Read on Event"
ON public.event
AS PERMISSIVE FOR SELECT
TO public
USING ( true );

CREATE POLICY "Public Read on Status"
ON public.status
AS PERMISSIVE FOR SELECT
TO public
USING ( true );

CREATE POLICY "Public Read for Game"
ON "public"."game"
AS PERMISSIVE FOR SELECT
TO public
USING (true);


CREATE POLICY "Authenticated Insert and Update for Event"
ON "public"."event"
AS PERMISSIVE FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated Insert and Update for Game"
ON "public"."game"
AS PERMISSIVE FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated Insert and Update for Game Session"
ON "public"."game_session"
AS PERMISSIVE FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);