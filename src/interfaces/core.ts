/**
 * api核心接口
 */
export interface Core {
	lineDetail(params: Object, cb: any): any;
	nearlines(params: Object, cb: any): any;
	baseSearch(parmas: Object, cb: any): any;
}
