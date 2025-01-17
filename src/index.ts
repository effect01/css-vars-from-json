export type JsonObject = {
	[key: string]: string | number | JsonObject;
};

export default function cssVars(variables: JsonObject | string) {
	const variablesObject: JsonObject =
		typeof variables === 'string' ? JSON.parse(variables) : variables;
	return generateVariables('', variablesObject);
}

function generateVariables(path: string, object: JsonObject): string {
	let styles = '';
	Object.entries(object).forEach(([key, value]) => {
		if (typeof value === 'object') {
			styles += generateVariables(`${join(path, key)}`, value);
		} else {
			styles += `--${join(path, key)}: ${value};`;
		}
	});
	return styles;
}

function join(path: string, key: string): string {
	if (!path) return key;
	return `${path}-${key}`;
}
