
import { Inngest } from "inngest";
// must include .js ext in files because we are using type module
import User from "../models/User.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "movie-ticket-booking" });

// ingest function to save user data in database
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-form-clerk",  triggers:[{ event: "clerk/user.created" } ]},
  async ({ event}) => {
    const {id, first_name, last_name, email_addresses, image_url} = event.data;
    const userData = {
        _id: id,
        name: first_name + " " + last_name,
        email: email_addresses[0].email_address,
        image: image_url
    }
    await User.create(userData)
  },
);


// ingest function to delete user data from database
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk", triggers:[  { event: "clerk/user.deleted" } ]},
  async ({ event}) => {
   const {id} = event.data
   await User.findByIdAndDelete(id)
  },
);



// ingest function to update user data in database
const syncUserUpdation = inngest.createFunction(
  { id: "update-user-form-clerk", triggers:[  { event: "clerk/user.updated" } ]},
  async ({ event}) => {
    const {id, first_name, last_name, email_addresses, image_url} = event.data;
    const userData = {
        _id: id,
        name: first_name + " " + last_name,
        email: email_addresses[0].email_address,
        image: image_url
    }
    await User.findByIdAndUpdate(id, userData)
  },
);


// Create an empty array where we'll export future Inngest functions
export const functions = [
    syncUserCreation,
    syncUserDeletion,
    syncUserUpdation

];