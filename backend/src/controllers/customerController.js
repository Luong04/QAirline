const express = require('express');

const getHomepage = (req, res) => {
    return res.render('home.ejs')
}

const getTest = (req, res) => {
    res.render('sample.ejs');
}

const getFlight = (req, res) => {
    res.render('flights.ejs')
}

module.exports = {
    getHomepage, getTest, getFlight
}

