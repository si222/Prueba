const template = `<div> 
<v-app id="inspire">
    <v-app-bar
      app
      shrink-on-scroll
      color="secondary"
      
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Usuarios</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>


      <v-autocomplete
        v-model="model"
        :items="items"
        :loading="isLoading"
        :search-input.sync="search"
        color="black"
        hide-no-data
        hide-selected
        item-text="Nombre"
        item-value="Usuario"
        label="Filtro de búsqueda"
        placeholder="Aplique el filtro para buscar por usuario, email o ciudad"
        prepend-icon="mdi-database-search"
        return-object
      ></v-autocomplete>
    </v-card-text>
    <v-divider></v-divider>
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
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!model"
        color="grey darken-3"
        @click="model = null"
      >
        Limpiar
        <v-icon center>
          mdi-close-circle
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
      <v-container>
        <v-row>
          <v-col
            v-for="dato in datos"
            :key="n"
            cols="6"
          >
            <v-card height="220"  class="mx-auto"  color="primary">
              Nombre de usuario: {{dato.name}}
            <br></br>
              Username: {{dato.username}}
            <br></br>
              Email: {{dato.email}}
            <br></br>
              Ciudad: {{dato.address.city}}
            <br></br>
              Empresa: {{dato.company.name}}</v-card>
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
        datos : '',
        nombreLimit: 60,
        entries: [],
        isLoading: false,
        model: null,
        search: null,
    }),
    created() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(r => r.json())
            .then( r => {this.datos = r})
    }, 
    computed: {
      fields () {
        if (!this.model) return []
        return Object.keys(this.model).map(key => {
          return {
            key,
            value: this.model[key] || 'n/a',
          }
        })
      },
      items () {
        return this.entries.map(entry => {
          const Nombre = entry.Nombre.length > this.nombreLimit
            ? entry.Nombre.slice(0, this.nombreLimit) + '...'
            : entry.Nombre
          return Object.assign({}, entry, { Nombre })
        })
      },
    },
    watch: {
      search (val) {
        // Items have already been loaded
        if (this.items.length > 0) return
        // Items have already been requested
        if (this.isLoading) return
        this.isLoading = true
        // Lazily load input items
        fetch('https://jsonplaceholder.typicode.com/users')
          .then(res => res.json())
          .then(res => {
            const { count, entries } = res
            this.count = count
            this.entries = entries
          })
          .finally(() => (this.isLoading = false))
      },
    }
  }