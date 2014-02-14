/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var index = require('./routes/index');
var signup = require('./routes/signup');
var project = require('./routes/project');
var login = require('./routes/login');
var intervieweeSurvey = require('./routes/intervieweeSurvey');
var interviewerSurvey = require('./routes/interviewerSurvey');
var match = require('./routes/match');
var match1 = require('./routes/match1');
var detailInfo = require('./routes/detailInfo');
var detailInfo1 = require('./routes/detailInfo1');
var startInterview = require('./routes/startInterview');
var unimplemented = require('./routes/unimplemented');

// INTERVIEWER PROFILE PAGES
var interviewerProfile = require('./routes/interviewerProfile');
var interviewerPastExp = require('./routes/interviewerPastExp');
var interviewerAboutMe = require('./routes/interviewerAboutMe');

// INTERVIEWEE PROFILE PAGES
var intervieweeProfile = require('./routes/intervieweeProfile');
var intervieweeFeedback = require('./routes/intervieweeFeedback');
var intervieweePublicRatings = require('./routes/intervieweePublicRatings');
var intervieweeSkills = require('./routes/intervieweeSkills');
var intervieweeAreasToImprove = require('./routes/intervieweeAreasToImprove');

var partialsDir="views/partials/";

// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
app.get('/signup', signup.view);
app.get('/project/:name', project.viewProject);
app.get("/intervieweeSurvey", intervieweeSurvey.dosurveyInterviewee);
app.get("/interviewerSurvey", interviewerSurvey.dosurveyInterviewer);
app.get("/match", match.viewMatchPage);
app.get("/match1",match1.viewMatch1Page);
app.get("/detailInfo",detailInfo.viewDetail);
app.get("/detailInfo1",detailInfo1.viewDetail);
app.get("/startInterview",startInterview.kickoff);
app.get("/login", login.viewLogin);
app.get("/unimplemented", unimplemented.viewUnimplemented);

//INTERVIEWEE PAGES
app.get('/intervieweeProfile', intervieweeProfile.viewIntervieweeProfile);
app.get('/intervieweeFeedback',intervieweeFeedback.viewIntervieweeFeedback);
app.get('/intervieweeSkills',intervieweeSkills.viewIntervieweeSkills);
app.get('/intervieweePublicRatings',intervieweePublicRatings.viewIntervieweePublicRatings);
app.get('/intervieweeAreasToImprove',intervieweeAreasToImprove.viewIntervieweeAreasToImprove);

//INTERVIEWER PAGES
app.get('/interviewerProfile', interviewerProfile.viewInterviewerProfile);
app.get('/interviewerPastExp', interviewerPastExp.viewInterviewerPastExp);
app.get('/interviewerAboutMe', interviewerAboutMe.viewInterviewerAboutMe);

// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
