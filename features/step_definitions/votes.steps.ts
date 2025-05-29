import { When, Then, Given } from '@cucumber/cucumber';
import { expect } from 'chai';
import { getRequest, postRequest, deleteRequest } from '../support/api';
import {PartialVote} from "../types/cat.types";

const newVote: PartialVote = {
    image_id: "asf2",
    sub_id: "my-user-1234",
    value: 1
};
export const context: { newVoteId?: number } = {};

When('I send a GET request to {string}', async function (path: string) {
    this.response = await getRequest(path);
    this.votes = this.response.data;
});

Then('the response status should be {int}', function (status: number) {
    expect(this.response?.status).to.equal(status);
});

Then('the votes array should have more than 0 items', function () {
    expect(this.votes.length).to.be.greaterThan(0);
});


Given('I have stored votes', async function () {
    const res = await getRequest('/votes');
    this.votes = res.data;
});

When('I get a vote by random ID', async function () {
    const randomVote = this.votes[Math.floor(Math.random() * this.votes.length)];
    this.selectedVote = randomVote;
    this.response = await getRequest(`/votes/${randomVote.id}`);
});

Then('the returned vote should match the stored vote', function () {
    const { user_id, ...responseVote } = this.response?.data;
    expect(responseVote).to.deep.equal(this.selectedVote);
});

When('I send a POST request to {string} with data', async function (path: string){
    this.response = await postRequest(path, newVote);
    context.newVoteId = this.response.data.id;
});

Then('the response should contain a non-empty id and SUCCESS message', function () {
    expect(this.response?.data.message).to.equal("SUCCESS");
    expect(this.response?.data.id).to.be.greaterThan(0);
});

When('I get the newly created vote by ID', async function () {
    this.response = await getRequest(`/votes/${context.newVoteId}`);
});

Then('the fields should match the original POST data', function () {
    expect(this.response?.data.image_id).to.equal(newVote.image_id);
    expect(this.response?.data.sub_id).to.equal(newVote.sub_id);
    expect(this.response?.data.value).to.equal(newVote.value);
});

When('I delete the newly created vote', async function (    ) {
    this.response = await deleteRequest(`/votes/${context.newVoteId}`);
});

Then('the response should contain SUCCESS message', function () {
    expect(this.response?.data.message).to.equal("SUCCESS");
});

When('I get the deleted vote by ID', async function () {
    try {
        await getRequest(`/votes/${context.newVoteId}`);
    } catch (err: any) {
        this.response = err.response;
    }
});

Then('the response message should be NOT_FOUND', function () {
    expect(this.response?.data).to.equal("NOT_FOUND");
});
