var app = angular.module('georanker');
app.value("baseUrl", {
    api: "https://api.georanker.com/v1/api/login.json",
    report: 'https://api.georanker.com/v1/report/list.json',
    newReport: 'https://api.georanker.com/v1/report/new.json'
});