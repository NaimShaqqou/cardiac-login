import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const CLIENT_SECRET = process.env.CLIENT_SECRET;
const AUTHORIZATION_SERVER_TOKEN_URL = process.env.AUTHORIZATION_SERVER_TOKEN_URL;

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('codeToTokenExchanger executed via http request.');
    
    const { code, client_id, redirect_uri } = req.query;

    const data = await fetch(
		`${AUTHORIZATION_SERVER_TOKEN_URL}?grant_type=authorization_code&client_id=${client_id}&client_secret=${CLIENT_SECRET}&redirect_uri=${redirect_uri}&code=${code}`,
		{
			method: 'POST',
		}
	);

    context.res = { body: await data.json() };
};

export default httpTrigger;