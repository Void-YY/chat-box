/*
 * @Author: Yan Yu
 * @Date: 2021-07-07 16:27:42
 * @LastEditTime: 2022-02-13 17:53:43
 * @LastEditors: VoidY
 * @Description:
 * @FilePath: \tyre-sale\src\core\store\getters.js
 */
const getters = {
  token: (state) => state.user.token,
  login_info: (state) => state.user.login_info,
}
export default getters
