import { useTranslation } from "react-i18next"

const Dashboard = ()=>{
    const {t}= useTranslation()
    return(
        
        <h1>{t('global.feature will be added soon').toUpperCase()}</h1>
    )
}
export default Dashboard