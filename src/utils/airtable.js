import Airtable from "airtable";

Airtable.configure({
    endpointUrl: "https://api.airtable.com",
    apiKey: "patc5NE8wk3hCZIHK.8e89de9cf4f5dcd88d206c855c7cc6d6198aa071c8adcbe001a43bc0ab537451",
});

const base = Airtable.base("appJX5IrSarTsSCWL");

export default base;
