// import * as tf from "@tensorflow/tfjs";
import dotenv from "dotenv";
dotenv.config();

const OPENAI_KEY = process.env.OPENAI_KEY;

chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
});

const getDoesContainSpoilerContentFromTitle = async (title) => {
	const response = await makeGPTRequestFromTitle(title);
	// if "yes" is a substring of the response
	if (typeof response === "string" && response.toLowerCase().indexOf("yes") !== -1) {
		return true;
	}
	else {
		return false;
	}
}

const makeGPTRequestFromTitle = async (title) => {
	const content = "Tell me in one word if the following title contains spoiler information for the sports event if and only if this title applies to a sports event that may have been recently played. If it looks like a compilation of events, reply No.: \"" + title;
	const response = await makeGPTRequest(content);
	return response;
}

const makeGPTRequest = async (content) => {
	const headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${OPENAI_KEY}`,
	};
	const requestBody = {
		"model": "gpt-3.5-turbo",
		"messages": [{"role": "user", "content": content}],
		"temperature": 0.7
	}
	const response = await fetch("https://api.openai.com/v1/chat/completions", {
		method: 'POST',
		headers: headers,
		body: JSON.stringify(requestBody),
	});
	const data = await response.json();
	return data.choices[0].message.content;
}

const getAltTitleFromTitle = async (title) => {
	const followupPrompt = "What would an alternate title for: \"" + title + "\" that contains no spoiler information about the event?";
	const headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${OPENAI_KEY}`,
	};
	const requestBody = {
		"model": "gpt-3.5-turbo",
		"messages": [{"role": "user", "content": followupPrompt}],
		"temperature": 0.7
	}
	const response = await fetch("https://api.openai.com/v1/chat/completions", {
		method: 'POST',
		headers: headers,
		body: JSON.stringify(requestBody),
	});
	const data = await response.json();
	return data.choices[0].message.content;
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	trySendResponseAsync(message, sendResponse)
	return true;
});

async function trySendResponseAsync(message, sendResponse){
	const response = {
		"thumbnail": false,
		"title": false,
		"alt_title": ""
	}
	if (Object.keys(message).includes("thumbnail")) {
		// TODO:
	}
	else if (Object.keys(message).includes("title")) {
		const containsSpoilers = await getDoesContainSpoilerContentFromTitle(message["title"]);
		response["title"] = containsSpoilers
		console.log(message["title"], containsSpoilers);
	}
	if (response["title"]) {
		response["alt_title"] = await getAltTitleFromTitle(message["title"]);
	}
	console.log(response);
	sendResponse(response);
}