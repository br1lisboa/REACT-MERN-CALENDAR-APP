

export const getEnvVariables = () => {

    //* ESTA ES LA MANERA EN QUE IMPORTAMOS NUESTRAS VARIABLES DE ENTORNO
    import.meta.env

    return {
        ...import.meta.env
    }
}