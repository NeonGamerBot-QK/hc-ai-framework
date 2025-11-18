/**
 * GET / (logged in) -> inspect "Usage Statistics" container -> extract users stats
 * ^ -> retrive allowed models for chat completions
 * ^ -> allow embeding models 
 * GET /api/keys -> get api key list (name,key preview, created,status)
 * ^ -> requests (time, model, tokens, duration, ip)
 * POST /api/keys, json body, name: "fhyufnreuiufe", preview:
 * id: "xxx-xx-4191-a04f-xxx"
key: "sk-hc-v1-xxxxx"
name:"e"
 *  DELETE /api/keys/:id -> removokes a key (keys cannot be deleted it seems)
 * GET /global -> get global stats
 * ^ get usage by modal table
 */

export default class UserApiAboose {}
