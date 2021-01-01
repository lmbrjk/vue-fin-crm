// см. документацию по materialise css для
// методов M.Tooltip.init() и M.Tooltip.getInstance()
export default {
    bind(el, {value}){
        window.M.Tooltip.init(el, {html: value});
    },
    unbind(el){
        const tooltip = window.M.Tooltip.getInstance(el);
        
        // проверяем есть ли переменная tooltip и есть ли у неё метод destroy
        // для корректного удаления всех tooltip при переходе на другую страницу
        if(tooltip && tooltip.destroy){
            tooltip.destroy();
        }        
    }
}