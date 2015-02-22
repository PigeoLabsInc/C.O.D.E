This 'server' is a restful API powered by Laravel (laravel.com)

Table Schematics:

REQUIRED DATA SETS / MODELS:
- USER
- STUDY
- CITY
- JOB
- HOTSPOT
- SCHOOL
- INTEREST

user = {
	id,
	email,
	password,
	current_study_id,
	token,
	about
}

study = {
	id,
	name
}

city = {
	id,
	name,
	lat,
	lng,
	picture_src,
	appartment_average,
	salary_average, --> this will be static, we'll get this from open data
}

job = {
	id,
	title,
	salary, --> track this per job if we can find it, then we can calc avg salary in a city per field of study
	description,
	study_id,
	location_id
}

hotspot = {
	id,
	name,
	description,
	lat,
	lng,
	interest_id
}

school = {
	id,
	name,
	lat,
	lng,
	city_id
}

interest = {
	id,
	name
}


BRIDGE TABLES (MANY TO ONE):
- favorite cities of user
- jobs saved by user
- field of study job falls into
- interests to user
- interests to hotspots
- field of study to school

favorite_cities = {
	user_id,
	city_id
}

saved_jobs = {
	user_id,
	job_id
}

study_to_job = {
	job_id,
	study_id
}

interest_to_user = {
	interest_id,
	user_id
}

interest_to_hotspot = {
	hotspot_id,
	interest_id
}

study_to_school = {
	interest_id,
	school_id
}