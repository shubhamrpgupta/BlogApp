import config from "../config/config.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {

    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async loginUser({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.loginUser({ email, password });
            } else {
                return userAccount;
            }

        } catch (error) {
            throw error;
        }
    }

    async logoutUser() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error)
        }
    }

    async getCurrentUser() {
        try {
            const currentUser = await this.account.get();
            if (currentUser) {
                return currentUser;
            } else {
                return null;
            }
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error)
        }
        return null;
    }



}

const appwriteAuthService = new AuthService();

export default appwriteAuthService;