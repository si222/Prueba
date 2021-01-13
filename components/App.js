const template = `<div> 
<v-app id="inspire">
    <v-app-bar
      app
      shrink-on-scroll
      color="indigo accent-3"
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Usuarios</v-toolbar-title>

      <v-spacer></v-spacer>

      </v-app-bar>

    <v-main>
    <v-text-field 
      label="Filtro de Búsqueda"
      placeholder="Aplique el filtro para buscar por nombre, ciudad o email"
      v-model="filtro"
      class="mx-auto pa-3"
    />
    </v-card-text>
    <v-divider />
    <v-expand-transition>
      <v-list
        v-if="model"
      >
        <v-list-item
          v-for="(field, i) in fields"
          :key="i"
        >
          <v-list-item-content>
            <v-list-item-title v-text="field.value"></v-list-item-title>
            <v-list-item-subtitle v-text="field.key"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-expand-transition>
  </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
      <v-container>
        <v-row>
          <v-col
            v-for="dato in resultados"
            :key="n"
            cols="6"
          >
            <v-card class="mx-auto pa-3"  color="indigo lighten-5
            ">
            <b>Nombre de usuario:</b> {{dato.name}}
            <br />
            <b>Username:</b> {{dato.username}}
            <br />
            <b>Email:</b> {{dato.email}}
            <br />
            <b>Ciudad:</b> {{dato.address.city}}
            <br />
            <b>Empresa:</b> {{dato.company.name}}</v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>  
</div>`

export default {
    name : 'app',
    template,
    data : ()=>({
        datos : [],
        filtro : ''
    }),
    created() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(r => r.json())
            .then( r => {this.datos = r})
    },
    computed: {
      // Para filtrar los resultados por ciudad, nombre o email y que sólo traiga los contenedores que se filtran por dichos resultados
      resultados(){
        return this.datos.filter(dato => {
          if (this.filtro === '') {
            return true
          }
          let isValid = false
          if (dato.name.toLowerCase().includes(this.filtro.toLowerCase())) {
            isValid = true
          }
          if (dato.address.city.toLowerCase().includes(this.filtro.toLowerCase())) {
            isValid = true
          }
          if (dato.email.toLowerCase().includes(this.filtro.toLowerCase())) {
            isValid = true
          }
          return isValid
        })
      }
    }
  }