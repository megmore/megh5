export declare const unit = "100vw / 100";
interface screenSize {
    height: '100vh';
    width: '100vw';
}
/**
 *
 * @param options
 */
export declare function setPageSize(options: screenSize): void;
/**
 * 获取尺寸值
 * @param val
 */
export declare function getUnitVal(val: string | number | undefined): string | undefined;
/**
 * 计算尺寸样式值
 * @param styles
 * @param property
 * @param val
 */
export declare function genSize(styles: any, property: string, val: string | number | undefined): void;
/**
 * 计算样式X坐标
 * @param styles
 * @param float
 * @param val
 */
export declare function genPosX(styles: any, val: string | number | undefined, float?: boolean): void;
/**
 * 计算样式Y坐标
 * @param styles
 * @param float
 * @param val
 */
export declare function genPosY(styles: any, val: string | number | undefined, float?: boolean): void;
/**
 * 计算背景图片样式
 * @param styles
 * @param val
 */
export declare function genBgImg(styles: any, val: string | undefined): void;
/**
 * 获取计算颜色样式值
 * @param styles
 * @param property
 * @param val
 */
export declare function genColor(styles: any, property: string, val: string | undefined): void;
export {};