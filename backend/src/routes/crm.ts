import { Router } from "express";

import {
    get_all_accountExecutives,
    get_accountExecutive,
    create_accountExecutive
} from "../controllers/crm/accountExecutiveController";

import {
    get_all_activities,
    get_activity,
    create_activity
} from "../controllers/crm/activityController";

import {
    get_all_channels,
    get_channel,
    create_channel
} from "../controllers/crm/channelController";

import {
    get_all_leads,
    get_lead,
    create_lead
} from "../controllers/crm/leadController";

import {
    get_all_opportunities,
    get_opportunity,
    create_opportunity
} from "../controllers/crm/opportunityController";

import {
    get_all_ratings,
    get_rating,
    create_rating
} from "../controllers/crm/ratingController";

import {
    get_all_stages,
    get_stage,
    create_stage
} from "../controllers/crm/stageController";

const crmrouter = Router();

crmrouter
    .get("/accountexecutives", get_all_accountExecutives)
    .get("/accountexecutive/:id", get_accountExecutive)
    .post("/accountexecutive/", create_accountExecutive)

crmrouter
    .get("/activities", get_all_activities)
    .get("/activity/:id", get_activity)
    .post("/activity/", create_activity)

crmrouter
    .get("/channels", get_all_channels)
    .get("/channel/:id", get_channel)
    .post("/channel/", create_channel)

crmrouter
    .get("/leads", get_all_leads)
    .get("/lead/:id", get_lead)
    .post("/lead/", create_lead)

crmrouter
    .get("/opportunities", get_all_opportunities)
    .get("/opportunity/:id", get_opportunity)
    .post("/opportunity/", create_opportunity)

crmrouter
    .get("/ratings", get_all_ratings)
    .get("/rating/:id", get_rating)
    .post("/rating/", create_rating)

crmrouter
    .get("/stages", get_all_stages)
    .get("/stage/:id", get_stage)
    .post("/stage/", create_stage)

export default crmrouter;