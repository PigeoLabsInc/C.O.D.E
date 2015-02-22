This 'server' is a restful API powered by Laravel (laravel.com)

Table Schematics:
REQUIRED DATA SETS / MODELS:
- USER
- CITY
- JOB
- TIP
- SCHOOL

USER
fields = {
	id,
	password,
	email,
	token,
	description,
	field_of_study,
	interests,
}

city = {
	lat,
	lng,
	name,
	
}