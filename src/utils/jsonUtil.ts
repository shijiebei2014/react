import * as path from 'path';
import * as fs from 'fs';

export const is_json_string = function(jsonstring) {
	var flag = true
	try {
		JSON.parse(jsonstring)
	} catch(e) {
		flag = false
	} finally {
		return flag
	}
}

export const read = function(p = path.join(__dirname, '../../lineId.json')) {
    if (fs.existsSync(p)) {
        var content = fs.readFileSync(p).toString()
        console.log(`content: ${content}`)
        if (is_json_string(content)) {
            return JSON.parse(content)
        }
    }
    return null;
}

export const write = function(content, p = path.join(__dirname, '../../lineId.json')) {
    if (fs.existsSync(p)) {
       fs.writeFileSync(p, content);
    }
    return false;
}