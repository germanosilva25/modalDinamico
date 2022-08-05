var dialog = {
    corpo: function (opt) {
        let buttons = $("<div/>");

        let body = $("<div/>", { id: "dialog" }).html(`
                <div class="modal show">
                    <div class="modal-dialog shadow">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 style="color: ${opt.color}"><i>${opt.type}</i>${opt.title} </h4>
                                <button type="button" class="btn-close" onclick="$('#dialog').remove()"></button>
                            </div>
                            <div class="modal-body">
                                </p>${opt.message}</p>
                            </div>
                            <div class="modal-footer"></div>
                        </div>
                    </div>
                </div>
                <div class="modal-backdrop show"></div>
            `);

        if (!opt.buttons) {
            opt.buttons = [{ class: "primary", text: opt.text || "OK" }];
            if (opt.callback) {
                opt.buttons[0].callback = opt.callback;
            }
        }

        $.each(opt.buttons, (i, attributes) => {
            let callback;

            if (attributes.hasOwnProperty("callback")) {
                callback = attributes.callback;

                delete attributes.callback;
            }

            if (!attributes.hasOwnProperty("class")) {
                attributes.class = "btn btn-primary";
            } else {
                attributes.class = `btn btn-${attributes.class}`;
            }

            let btn = $("<button/>", attributes).on("click", () => {
                $("#dialog").remove();

                if (typeof callback == "function") callback();
            });

            $(".modal-footer", body).append(btn);
        });
        $("body").append(body);
    },
    info: (opt) => {
        return dialog.corpo({
            ...{
                color: "#66abd3",
                type: icone.info,
            },
            ...opt,
        });
    },

    danger: (opt) => {
        return dialog.corpo({
            ...{
                color: "#9e2c27",
                type: icone.danger,
            },
            ...opt,
        });
    },

    success: (opt) => {
        return dialog.corpo({
            ...{
                color: "#14b144",
                type: icone.success,
            },
            ...opt,
        });
    },

    warning: (opt) => {
        return dialog.corpo({
            ...{
                color: "#bd6513",
                type: icone.warning,
            },
            ...opt,
        });
    },
};

var icone = {};
icone.svg = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                            <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                            </symbol>
                            <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                            </symbol>
                            <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                            </symbol>
                        </svg> `;
icone.info = `${icone.svg}<svg class="bi flex-shrink-0 me-2" width="18" height="18" role="img" aria-label="Info:"><use xlink:href="#info-fill"/></svg>`;
icone.danger = `${icone.svg}<svg class="bi flex-shrink-0 me-2" width="18" height="18" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>`;
icone.warning = `${icone.svg}<svg class="bi flex-shrink-0 me-2" width="18" height="18" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>`;
icone.success = `${icone.svg}<svg class="bi flex-shrink-0 me-2" width="18" height="18" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>`;

var timeout;
var alerta = {
    corpo: function (opt) {
        $("#alerta").remove();
        let buttons = $("<div/>");
        let body = $("<div/>", { id: "alerta" }).html(`
                <div class="alert alert-${opt.class} alert-dismissible fade show alerta" role="alert">
                    <strong>${opt.type}</strong> ${opt.message}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                
            `);

        $("body").append(body);

        if (timeout) clearTimeout(timeout);

        timeout = setTimeout(() => {
            body.fadeOut(3000, () => body.remove());
        }, 3000);
    },
    info: (opt) => {
        return alerta.corpo({
            ...{
                color: "#66abd3",
                type: icone.info,
                class: "info",
            },
            ...opt,
        });
    },

    danger: (opt) => {
        return alerta.corpo({
            ...{
                color: "#9e2c27",
                type: icone.danger,
                class: "danger",
            },
            ...opt,
        });
    },

    success: (opt) => {
        return alerta.corpo({
            ...{
                color: "#14b144",
                type: icone.success,
                class: "success",
            },
            ...opt,
        });
    },

    warning: (opt) => {
        return alerta.corpo({
            ...{
                color: "#bd6513",
                type: icone.warning,
                class: "warning",
            },
            ...opt,
        });
    },
};

/**
 * Cria botões.
 * @version 1.0.0
 */
var builder = {
    callback: null,
    button: (prop, callback) => {
        console.log(prop.div)
        var el = prop.div ? prop.div : 'body'
        //return
        //var type = props.type
        var div = $("<div/>", {
            class: "container mt-3"
        });

        var btn = $("<button/>", {
            type: "button",
            class: "btn btn-" + prop.class,
            text: prop.text,
            id: prop.id,
        });

        if (typeof prop.callback == "function")
            btn.on("click", prop.callback)

        if (typeof callback == "function")
            //btn.on("click", () => {callback(div)});
            btn.on("click", callback);
        // if (typeof builder.callback == "function")
        //     btn.on("click", builder.callback);
        // btn.on("click", function () {
        //     $(this).parent().remove();
        //     console.log($(this));
        // });

       // $(el).append(div.append(btn));
        //return div.append(btn);
        return btn

        // $(".sample").on("click", function () {
        //     $(this).parent().remove();
        //     console.log($(this));
        // });
    },

    primary: (prop) => {
        return builder.button({
            ...{
                class: "primary",
                text: "Botão gerado!",
            },
            ...prop,
        });
    },

    warning: function (prop) {
        return builder.button({
            ...{
                class: arguments.callee.name,
                text: "Cuidado",
            },
            ...prop,
        });
    },

    info: function (prop) {
        return builder.button({
            ...{
                class: arguments.callee.name,
                text: "Botão gerado!",
            },
            ...prop,
        });
    },

    danger: function (prop) {
        return builder.button({
            ...{
                class: arguments.callee.name,
                text: "Botão gerado!",
            },
            ...prop,
        });
    },

     /**
     * Cria botão com a classe "success".
     * @param {Object|function} mixed - Pode ser um objeto ou um callback (função).
     * @example
     * builder.secondary({
     *     text: "Texto do botão",
     *     callback: function(){
     *         function one(){
     *          }
     * 
     *          function two(){
     *          }
     *     }
     * });
     */
    success: function (prop) {
        return builder.button({
            ...{
                class: arguments.callee.name,
                text: "Botão gerado!",
            },
            ...prop,
        });
    },

    /**
     * Cria botão com a classe "secondary".
     * @param {Object|function} mixed - Pode ser um objeto ou um callback (função).
     * @example
     * builder.secondary({
     *     text: "Texto do botão",
     *     callback: function(){
     *         $(this).text("Novo Texto").
     *         prop({
     *             disabled: true,
     *             style: "background-color: red",
     *             class: "btn btn-success"
     *         })
     *         console.log(this)
     *     }
     * });
     */
    secondary: function (mixed) {
        console.log(mixed)
        //return
        let prop = {}, callback = null;
        
        if (typeof mixed == 'function')
            callback = mixed;
        else
            prop = mixed;

        return builder.button({
            ...{
                class: arguments.callee.name,
                text: "Secondary",
            },
            ...prop,
        }, callback);
    },
};

var builder2 = {
    element: function(prop){
        
        var appending = prop.div ? prop.div : 'body'
        console.log(prop.class)
        //return
        //var type = props.type
        var div = $("<div/>", {
            class: prop.div
        });
        
        var label = $('<label/>', {
            for: prop.name,
            text: prop.label,
            id: prop.labelId
        })

        var el = $('<input/>', {
            class: 'form-control',
            placeholder: prop.placeholder,
            type: prop.type,
            id: prop.id,
            name: prop.name,
            value: prop.value
        })
        // $(appending).append(div)
        // $(div).append(el)
        
        return $(div).append(label, el)
        
        },
        
        input: function (prop) {
            
            return builder2.element({
                ...{
                    class: 'form-control',
                    value: "Germano Silva",
                },
                ...prop,
            });
    },
}




$('#juros').on('click', function(){
    $('#conteudo').html('')
    $('#conteudo').append(builder2.input({value: '132500', label: 'Valor', name: 'capital', id:'capital', placeholder: 'Digite valor do montante', class: 'form-control', div: 'mb-3 mt-3'}))
    $('#conteudo').append(builder2.input({value: '2.5', label: 'Juros mensal', name: 'taxa', id: 'taxa', placeholder: 'Digite a taxa de juros mensal', class: 'form-control', div: 'mb-3 mt-3'}))
    $('#conteudo').append(builder2.input({value: '12', label: 'Prazo', name: 'prazo', id: 'prazo', placeholder: 'Digite o prazo', class: 'form-control', div: 'mb-3 mt-3'}))
   
    composto = builder.primary({
        text: "Calcular Juros Composto",
        id: 'composto',
        callback: function(){
            calcularJurosCompostos();
            // alert('Juros compostos')
            
        },
    }),
    simples = builder.primary({
        text: "Calcular Juros Simples",
        id: 'simples',
        callback: function(){
            calcularJurosSimples()
            // alert('Juros compostos')
        }
    });

        
    $('#conteudo').append(composto, simples)
    var c = 0, i = 0, t = 0, s = 0
    function calcularJurosCompostos(){
        $('p[id=total]').text('22')
        
        c = parseFloat($('#capital').val())
        i = parseFloat($('#taxa').val())
        t = parseFloat($('#prazo').val())

        var m = c*Math.pow((1+(i/100)), t)-c
        console.log('capital: ' + c)
    console.log('taxa: ' + i)
    console.log('montante: ' + (m+c).toFixed(2))
    console.log('montante: ' + m)
        //var t = c+m
        var t = m+c
        var t2 = t.toString().replace('.', ',')
        //console.log('montante: ' + t2.mask('999.999.999,99'))
        $('p[id=capital]').text(c.toFixed(2))
        $('p[id=juros]').text(i.toFixed(2))
        $('p[id=total]').text(t.toFixed(2))
    }
    function calcularJurosSimples(){
        //var c = 0, i = 0, t = 0
        c = parseFloat($('#capital').val())
        i = parseFloat($('#taxa').val())
        t = parseFloat($('#prazo').val())
        
        var m = (c*(i/100)*t)+c
        



        $('p[id=capital]').text(c.toFixed(2))
        $('p[id=juros]').text(i.toFixed(2))
        $('p[id=total]').text(m.toFixed(2))
        
    }
})


//criar tabela dinâmica
var obj = {'name': 'Joao', 'idade': '25', 'sexo':'M', 'peso': 25}
var obj = [{'name': 'Joao', 'idade': '25', 'sexo':'M', 'peso': '81'}, {'name': 'Maria', 'idade': '236', 'sexo':'F', 'peso': '60'}]

function findValue(){
    var temp = [...arguments].map((v) => v.toString())

    if(obj instanceof Array){
        obj.forEach(element => {
                console.log(typeof(element[temp[0]]))
                //console.log(temp)

                if(temp.includes(element[temp[0]].toString()))
                    return true
            } 
        );
    } else if(obj instanceof Object){console.log('object | ')
        
        for(var x in obj){
            if(temp.includes(obj[temp[0]].toString()))
            return true;
    } 
    }
    //return false  
}

console.log(findValue('peso', '25',36,21,36))


console.log(1000.855785>>>0)
console.log(Math.trunc(1000.855785))
console.log(1000.855785.toFixed(0))

var e = []
e = [...e, 'germano']
e = [...e, '42']
console.log(e)

var valores = [2, 1]
console.log(valores)
