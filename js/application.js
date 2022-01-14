/**
 * Parametro random utile a risolvere il problema
 * dei file javascript dalla cache
 */
var rnd = Math.floor(Math.random() * 8000);


/**
 * Definisco il namespace App che mi permette di chiamare univocamente le funzioni
 */
var App;
App = App || (function () {

        return {
            createNotifyError: function (message) {
                jQuery.notify({
                    // options
                    title: "Attenzione si &egrave verificato un errore:",
                    message: message

                }, {
                    // settings
                    type: "danger",
                    allow_dismiss: true,
                    newest_on_top: true,
                    showProgressbar: false,
                    placement: {
                        from: "bottom",
                        align: "center"
                    },
                    offset: 50,
                    spacing: 10,
                    z_index: 10301,
                    //Durata della notifica
                    delay: 10000,
                    timer: 500,

                    animate: {
                        enter: 'animated fadeInDown',
                        exit: 'animated fadeOutUp'
                    },

                    onClosed: function () {
                        //window.location.reload();
                    }
                });
            },
            /**
             * Permette di aggiungere il file javascript dinamicamente
             * in modo che non venga caricato sempre dalla cache.
             *
             * @param filename - Nome del file js da caricare
             */
            loadJsFile: function (filename) {
            //Rimuovo gli stessi script caricati precedentemente
            while ((tags = document.getElementById(filename)) !== null) {
                tags.parentNode.removeChild(tags);
            }
            var fileref = document.createElement('script');
            fileref.setAttribute("id", filename);
            fileref.setAttribute("type", "text/javascript");
            fileref.setAttribute("src", filename + "?r=" + rnd);
            document.body.appendChild(fileref);
            },
            /**
             * Permette di ottenere il valore di un parametro presente
             * nel query string
             *
             * @param name String - Nome del parametro
             * @param url String - Url della pagina
             * @returns {*} String | undefined se non è presente il parametro
             */
            urlParam: function (name, url) {
                if (!url) {
                    url = window.location.href;
                }
                var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
                if (!results) {
                    return undefined;
                }
                return results[1] || undefined;
            }
        }

    })
    ();

