import './assets/main.css'
import PrimeVue from 'primevue/config';
import Aura from '@/presets/aura';
import 'primeicons/primeicons.css';
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from '@/composables/firebase.js'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// components
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import InputNumber from 'primevue/inputnumber';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import MultiSelect from 'primevue/multiselect';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import Dropdown from 'primevue/dropdown';
import Slider from 'primevue/slider';
import OverlayPanel from 'primevue/overlaypanel';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Dialog from 'primevue/dialog';
import InputMask from 'primevue/inputmask';
import FileUpload from 'primevue/fileupload';
import Chart from 'primevue/chart';
import Password from 'primevue/password';
import AutoComplete from 'primevue/autocomplete';

const app = createApp(App)

app.component('InputMask', InputMask)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('ColumnGroup', ColumnGroup)
app.component('Row', Row)
app.component('InputNumber', InputNumber)
app.component('IconField', IconField)
app.component('InputIcon', InputIcon)
app.component('InputText', InputText)
app.component('MultiSelect', MultiSelect)
app.component('Button', Button)
app.component('Tag', Tag)
app.component('Dropdown', Dropdown)
app.component('Slider', Slider)
app.component('OverlayPanel', OverlayPanel)
app.component('Toast', Toast)
app.component('Dialog', Dialog)
app.component('FileUpload', FileUpload)
app.component('Chart', Chart)
app.component('Password', Password)
app.component('AutoComplete', AutoComplete)


app.use(PrimeVue, {
    unstyled: true,
    pt: Aura,
});

app.use(ToastService);
app.use(createPinia())
app.use(router)

app.use(VueFire, {
    // imported above but could also just be created here
    firebaseApp: firebaseApp,
    modules: [
        // we will see other modules later on
        VueFireAuth(),
    ],
})

app.mount('#app')
