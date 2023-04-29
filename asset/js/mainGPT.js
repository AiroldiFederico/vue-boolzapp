




const { createApp } = Vue

createApp({

    
  // VARIABILI VUE
  data() {
    return {
        
      
        contacts: [
          {
              name: 'Michele',
              avatar: './asset/img/avatar_1.png',
              visible: true,
              messages: [
                  {
                      date: '10/01/2020 15:30:55',
                      message: 'Hai portato a spasso il cane?',
                      status: 'sent'
                  },
                  {
                      date: '10/01/2020 15:50:00',
                      message: 'Ricordati di stendere i panni',
                      status: 'sent'
                  },
                  {
                      date: '10/01/2020 16:15:22',
                      message: 'Tutto fatto!',
                      status: 'received'
                  }
              ],
          },
          {
              name: 'Fabio',
              avatar: './asset/img/avatar_2.png',
              visible: true,
              messages: [
                  {
                      date: '20/03/2020 16:30:00',
                      message: 'Ciao come stai?',
                      status: 'sent'
                  },
                  {
                      date: '20/03/2020 16:30:55',
                      message: 'Bene grazie! Stasera ci vediamo?',
                      status: 'received'
                  },
                  {
                      date: '20/03/2020 16:35:00',
                      message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                      status: 'sent'
                  }
              ],
          },
          {
              name: 'Samuele',
              avatar: './asset/img/avatar_3.png',
              visible: true,
              messages: [
                  {
                      date: '28/03/2020 10:10:40',
                      message: 'La Marianna va in campagna',
                      status: 'received'
                  },
                  {
                      date: '28/03/2020 10:20:10',
                      message: 'Sicuro di non aver sbagliato chat?',
                      status: 'sent'
                  },
                  {
                      date: '28/03/2020 16:15:22',
                      message: 'Ah scusa!',
                      status: 'received'
                  }
              ],
          },
          {
              name: 'Alessandro B.',
              avatar: './asset/img/avatar_4.png',
              visible: true,
              messages: [
                  {
                      date: '10/01/2020 15:30:55',
                      message: 'Lo sai che ha aperto una nuova pizzeria?',
                      status: 'sent'
                  },
                  {
                      date: '10/01/2020 15:50:00',
                      message: 'Si, ma preferirei andare al cinema',
                      status: 'received'
                  }
              ],
          },
          {
              name: 'Alessandro L.',
              avatar: './asset/img/avatar_5.png',
              visible: true,
              messages: [
                  {
                      date: '10/01/2020 15:30:55',
                      message: 'Ricordati di chiamare la nonna',
                      status: 'sent'
                  },
                  {
                      date: '10/01/2020 15:50:00',
                      message: 'Va bene, stasera la sento',
                      status: 'received'
                  }
              ],
          },
          {
              name: 'Claudia',
              avatar: './asset/img/avatar_6.png',
              visible: true,
              messages: [
                  {
                      date: '10/01/2020 15:30:55',
                      message: 'Ciao Claudia, hai novità?',
                      status: 'sent'
                  },
                  {
                      date: '10/01/2020 15:50:00',
                      message: 'Non ancora',
                      status: 'received'
                  },
                  {
                      date: '10/01/2020 15:51:00',
                      message: 'Nessuna nuova, buona nuova',
                      status: 'sent'
                  }
              ],
          },
          {
              name: 'Federico',
              avatar: './asset/img/avatar_7.png',
              visible: true,
              messages: [
                  {
                      date: '10/01/2020 15:30:55',
                      message: 'Fai gli auguri a Martina che è il suo compleanno!',
                      status: 'sent'
                  },
                  {
                      date: '10/01/2020 15:50:00',
                      message: 'Grazie per avermelo ricordato, le scrivo subito!',
                      status: 'received'
                  }
              ],
          },
          {
              name: 'Davide',
              avatar: './asset/img/avatar_8.png',
              visible: true,
              messages: [
                  {
                      date: '10/01/2020 15:30:55',
                      message: 'Ciao, andiamo a mangiare la pizza stasera?',
                      status: 'received'
                  },
                  {
                      date: '10/01/2020 15:50:00',
                      message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                      status: 'sent'
                  },
                  {
                      date: '10/01/2020 15:51:00',
                      message: 'OK!!',
                      status: 'received'
                  }
              ],
          }
      ],

      search: '',
      newMessage: '',
      messagesGPT: [],
      
      



    }
  },

  //chiamata function al caricamento della pagina
  created(){


  },

  // FUNZIONI VUE
  methods: {

    // selectContact(index) {
    //   this.contacts.forEach((contact, i) => {
    //     contact.visible = i === index;
    //   });

    //   console.log(this.contacts)
    // },
    

    selectContact(contact) {
      const index = this.contacts.findIndex(c => c === contact);
      this.contacts.forEach((c, i) => {
        c.visible = i === index;
      });
    },
    
    async sendMessage() {
        const openaiApiKey = `{ OPENAI_API_KEY } from './config.js'`;

        if (!this.newMessage) {
          return;
        }
        const message = {
          date: new Date().toLocaleString(),
          message: this.newMessage,
          status: 'sent'
        };
        this.selectedContact.messages.push(message);

        const userMessage = { role: 'user', content: this.newMessage };
        this.messagesGPT.push(userMessage);
        this.newMessage = '';
    
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          
          {
            model: 'gpt-3.5-turbo',
            messages: this.messagesGPT
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${openaiApiKey}`
            }
          },
        );
        console.log(response);
        const replyText = response.data.choices[0].message.content;
        console.log(message.message);
        console.log(replyText);
    
        
        setTimeout(() => {
            const reply = {
              date: new Date().toLocaleString(),
              message: replyText,
              status: 'received'
            };
            this.selectedContact.messages.push(reply);
            this.messages.push({ role: 'assistant', content: replyText });
            this.$nextTick(() => {this.scrollToBottom();});
          }, 2000);


        this.$nextTick(() => {this.scrollToBottom();});
    },


    scrollToBottom: function() {
      const container = this.$refs.chatContainer;
      container.scrollTop = container.scrollHeight;
    }

    
    
  },

  
  // FUNZIONE VUE CALCOLATA IN BASE AD ALTRE FUNZIONI
  computed: {
    selectedContact() {
      return this.contacts.find(contact => contact.visible);
    },

    filteredContacts() {
      if (!this.search) {
        return this.contacts;
      }
      const search = this.search.toLowerCase();
      return this.contacts.filter(contact => contact.name.toLowerCase().includes(search));
    }
  }


}).mount('#app')
