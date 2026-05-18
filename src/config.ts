import dotenv from 'dotenv';
dotenv.config();

export const config = {
  notionToken: process.env.NOTION_TOKEN || '',
};
