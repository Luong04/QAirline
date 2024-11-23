const express = require('express');

const getAdminPage = (req, res) => {
    if (req.session.authenticated) {
        res.render('admin.ejs', { user: req.session.user });
    } else {
        res.status(401).redirect('/login');
    }
}

const getAdminFlight = (req, res) => {
    if (req.session.authenticated) {
        res.render('flights_admin.ejs', { user: req.session.user });
    } else {
        res.status(401).redirect('/login');
    }
}

module.exports = {
    getAdminPage, getAdminFlight
}
