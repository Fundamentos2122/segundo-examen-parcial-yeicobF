# FDW: Examen 2P - Lista de tareas

Examen del segundo parcial de Fundamentos de Desarrollo Web.

En este parcial vimos JavaScript y la manipulación de HTML y el DOM, por lo que
es lo que tendremos que hacer.

> Importante: Podemos utilizar el framework de CSS que realizamos en este
> parcial:
>
> [**Framework CSS hecho en clase / 2P**](https://github.com/Fundamentos2122/framework-css-yeicobF.git "Framework CSS hecho en clase / 2P")

- [FDW: Examen 2P - Lista de tareas](#fdw-examen-2p---lista-de-tareas)
  - [Fecha de inicio y de entrega](#fecha-de-inicio-y-de-entrega)
  - [Instrucciones](#instrucciones)
    - [PDF con instrucciones](#pdf-con-instrucciones)
  - [Publicación de sitio web con GitHub Pages](#publicación-de-sitio-web-con-github-pages)
    - [GitHub Actions: GitHub Pages Action](#github-actions-github-pages-action)
  - [GitHub Actions y puntos a considerar](#github-actions-y-puntos-a-considerar)
    - [Parámetros obligatorios para el archivo](#parámetros-obligatorios-para-el-archivo)
    - [Ejecutar GitHub Action en `push` y `pull request` a `main`](#ejecutar-github-action-en-push-y-pull-request-a-main)
  - [Fuentes](#fuentes)

## Fecha de inicio y de entrega

|                  Inicio                  |                 Entrega                 |
| :--------------------------------------: | :-------------------------------------: |
| **Lunes, 8 de noviembre del 2021 [6PM]** | **Miércoles, 9 / NOV / 2021 [11:59PM]** |

## Instrucciones

Desarrollar una aplicación que sirva como lista de tareas que cumpla con los
siguientes puntos:

1. Tener un modal que despliegue el formulario para crear una tarea. Este debe
   ser válido y solicitar al usuario que al menos se guarde el título de la
   tarea.
2. Las tareas se van guardando en LocalStorage. Para identificar cada una, crear
   un ID auxiliar con la fecha en la que se crea la tarea (**investigarlo**).
3. En la pantalla se debe desplegar la lista de las tarea que están sin
   completar por default.
4. Cuando se utilice el filtro de "ver todas" se deben visualizar todas las
   tareas existentes y resaltar de alguna forma aquellas que ya han sido
   completadas.
5. La interfaz debe ser responsiva.

### PDF con instrucciones

[FDW - Instrucciones examen segundo parcial](INSTRUCCIONES_Segundo%20Examen%20Parcial.pdf "FDW - Instrucciones examen segundo parcial")

## Publicación de sitio web con GitHub Pages

Para publicar el sitio web, podemos hacerlo normalmente eligiendo una rama de
nuestro repositorio, pero solo podemos publicar el sitio si tenemos el contenido
en:

- `/(root)`
- `/docs/`

En mi caso, prefiero tener el código en una carpeta `./src/`, y de ahí es en
donde me gustaría publicar el sitio web. El problema es que, de base no se puede
publicar solo el contenido de un directorio, y hacerlo con las ramas manualmente
teniendo una estructura de archivos diferentes (que en la rama de la página solo
se tenga lo que está dentro de `./src/` en el root en lugar de toda la
estructura) es un lío y solo me rompo la cabeza.

### GitHub Actions: GitHub Pages Action

Encontré una herramienta que me ayudaría a lidiar con esta situación: **GitHub
Actions**, en la cual, se pueden configurar flujos o acciones a partir de
ciertos activadores que nosotros podemos indicar dependiendo de la acción.

Para este caso encontré una llamada
"[**GitHub Pages Action**](peaceiris/actions-gh-pages "https://github.com/marketplace/actions/github-pages-action#getting-started")"
y está muy bien documentada. Es verdad que nunca he utilizado GitHub Actions,
por lo que me llego a confundir, pero es la herramienta que utilicé.

En mi caso quiero publicar la carpeta `./src` cuando haga un `push` a `main` a
la rama `gh-pages` o cuando se haga un `Pull Request`, dado a que trabajaré en
otra rama para que no se envíe al sitio todo lo que haga, ya que a veces no subo
código del todo funcional.

## GitHub Actions y puntos a considerar

Hay diversos puntos a tomar en cuenta al utilizar GitHub Actions. A continuación
indicaré algunos:

- Hay un límite de minutos gratis por mes dependiendo del tipo de cuenta
- Al exceder el límite gratuito, se comenzará a cobrar una cuota dependiendo de
  lo que se utilice. Esto puede ser limitado con un límite de gastos en tu
  cuenta o en GitHub Actions.
- Los "jobs" hospedados por GitHub pueden ser ejecutados en `Windows`, `macOS` y
  `Linux`, pero hay una gran problemática: `Windows` y `macOS` tienen
  multiplicadores de minutos, mientras que `Linux` no. Los multiplicadores son
  los siguientes:
  - `Windows`: **x2**
  - `macOS`: **_x10_**
  - `Linux`: x1
- En el parámetro `job: runs-on:` se especifica el tipo de la máquina en la cual
  se ejecutará el "job". Esta puede ser tanto "GitHub-hosted runner" o una
  "self-hosted runner" que ejecutemos nosotros.
  - La lista de los GitHub-hosted runners se encuentra en el siguiente enlace:
    - [Lista de GitHub-hosted runners / Virtual environments](https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions#jobsjob_idruns-on "Lista de GitHub-hosted runners / Virtual environments")
      > En mi caso utilicé `Ubuntu 20.04` por lo mencionado anteriormente
      > respecto a los multiplicadores en los otros SO. El `YAML workflow label`
      > es: `ubuntu-latest` o `ubuntu-20.04`.

### Parámetros obligatorios para el archivo

Según la
[documentación de GitHub respecto a GitHub actions](https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions "documentación de GitHub respecto a GitHub actions")
los parámetros obligatorios en el archivo `YAML` son los siguientes:

- [on](https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions#on "on")
  - Evento de GitHub que activa el workflow.
- [jobs.<job_id>.runs-on](https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions#jobsjob_idruns-on "jobs.<job_id>.runs-on")
  - El tipo de máquina en el que se ejecutará el trabajo (job). Puede ser tanto
    GitHub-hosted runner como un self-hosted runner.

### Instalación de la GitHub Action: `actions-gh-pages` en repositorio

En la sección
[Getting started](https://github.com/marketplace/actions/github-pages-action#getting-started "GitHub Pages Action / Getting started")
indica lo siguiente:

> Add your workflow file `.github/workflows/gh-pages.yml` and push it to your
> remote default branch.

---

En el sitio de la action que se encuentra en el marketplace de GitHub
([GitHub / peaceiris / actions-gh-page](https://github.com/peaceiris/actions-gh-pages "GitHub / peaceiris / actions-gh-pages"))
se encuentran las instrucciones de instalación, las cuales son las siguientes:

1. Copy and paste the following snippet into your `.yml` file.

```yml
- name: GitHub Pages action
  uses: peaceiris/actions-gh-pages@v3.7.3
```

### Ejecutar GitHub Action en `push` y `pull request` a `main`

En mi caso solo quiero subir los cambios a `gh-pages` una vez que pase el código
a `main`, ya que sería el funcional. Esto podría ser a través de un `push`
directamente o mediante un `pull request` en `main`, por lo que tengo que
indicarlo para que no se suban los cambios de otras ramas también.

```yaml
name: Deploy GitHub Pages desde main

on:
   # Que el workflow se active en un push o pull request en la "main" branch.
   push:
      branches:
      - main
   pull_request:
      branches:
      - main

jobs:
   # https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions#jobsjob_id
   # jobs.<job_id> <- Puede ser cualquier nombre mientras sea único.
   deploy:
      name: Despliegue de la página en GitHub Pages
      # https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions#jobs
      # Hay que especificar un "runner environment" en donde se ejecutará el
      # "job".
      # Este entra en los límites del "workflow usage", ya que hay límites de
      # uso y costes por uso.
      #
      # https://docs.github.com/en/actions/learn-github-actions/usage-limits-billing-and-administration
      runs-on: ubuntu-20.04

      # Concurrencia para que si hubiese más de una tarea en el workflow, se
      # ejecuten secuencialmente y solo se pueda ejecutar una tarea hasta que
      # termine la anterior.
      concurrency:
         group: ${{ github.workflow }}-${{ github.ref }}
      steps:
         # https://github.com/actions/checkout
         # Indicamos que utilizamos esta versión de la action.
         # Esta action permite hacer un check-out del repositorio para que el
         # workflow pueda acceder al mismo.
         - uses: actions/checkout@v2

         # Nombre del workflow. Este se muestra en la página de actions del
         # repositorio.
         - name: Deploy GitHub Page
            # https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions#jobsjob_idstepsuses
            # Indicar la versión que utilizamos de la versión. De lo contrario,
            # esto podría romper los workflows o provocar comportamientos
            # inesperados cuando el propietaro de la `action` haga una actualización.
            uses: peaceiris/actions-gh-pages@v3.7.3
            with:
               # https://docs.github.com/en/actions/security-guides/automatic-token-authentication
               # Token único generado automáticamente.
               github_token: ${{ secrets.GITHUB_TOKEN }}
               # Publicar contenido de ./src/
               publish_dir: ./src
```

## Fuentes

- [Workflow syntax for GitHub Actions](https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions#onpushpull_requestpaths "Workflow syntax for GitHub Actions")
- [GitHub Actions — Run on Pull Request](https://futurestud.io/tutorials/github-actions-run-on-pull-request "GitHub Actions — Run on Pull Request")
- [Automatic token authentication](https://docs.github.com/en/actions/security-guides/automatic-token-authentication "Automatic token authentication")
- [Usage limits, billing, and administration](https://docs.github.com/en/actions/learn-github-actions/usage-limits-billing-and-administration "Usage limits, billing, and administration")
- [Administrar tu límite de gastos para GitHub Actions](https://docs.github.com/es/billing/managing-billing-for-github-actions/managing-your-spending-limit-for-github-actions "Administrar tu límite de gastos para GitHub Actions")
- [Acerca de la facturación para GitHub Actions](https://docs.github.com/es/billing/managing-billing-for-github-actions/about-billing-for-github-actions "Acerca de la facturación para GitHub Actions")
- [Lista de GitHub-hosted runners / Virtual environments](https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions#jobsjob_idruns-on "Lista de GitHub-hosted runners / Virtual environments")
- [GitHub / actions / checkout](https://github.com/actions/checkout "GitHub / actions / checkout")
- [GitHub Pages action](https://github.com/marketplace/actions/github-pages-action "GitHub Pages action")
- [GitHub / peaceiris / actions-gh-page](https://github.com/peaceiris/actions-gh-pages "GitHub / peaceiris / actions-gh-pages")
