let view = 'list';
let wrestlers = [];

function getWrestlers(params = {}) {
    const data = { ...params }
    $.ajax({
        method: "GET",
        url: `https://6186eecfcd8530001765ac2a.mockapi.io/Roster`,
        data,
    })
        .done(response => {
            wrestlers = response;
            renderWrestlerList();
        })
        .fail(response => {
            console.log('fail', response);
        })
        .always(() => {
            console.log('ajax completed');
        })
}

function renderWrestlerList() {
    $wrestlerList = $('#roster-list');
    $wrestlerList.empty();
    wrestlers.forEach(wrestler => {
        const $template = getWrestlerTemplate(wrestler);
        $wrestlerList.append($template);
    })
}

function getWrestlerTemplate(wrestler) {
    const templateSelector = `#wrestler-${view}-template`;
    const $template = $($(templateSelector).html());
    $template.find('.wrestler-name').text(wrestler.name);
    const image = `${wrestler.image}`;
    $template.find('.wrestler-poster').attr('src', image);
    $template.find('.debutYear').text(wrestler.debutYear);
    $template.find('.wins').text(wrestler.wins);
    $template.find('.loses').text(wrestler.loses);
    $template.find('.type').text(wrestler.type);
    return $template;
}

function getWrestlerParams() {
    const genres = [];
    $('.genre-checkbox:checked').each((index, el) => {
        genres.push(el.value);
    })
    const sortBy = $('#filter-sort').val();
    const params = {
        filter: genres.join(), sortBy: sortBy
    }
    return params;
}

$('#get-wrestlers').click(() => {
    getWrestlers(this.getWrestlerParams());
})

$('#grid-view').click(e => {
    view = 'grid';
    $(e.currentTarget).addClass('btn-primary').removeClass('btn-outline-primary');
    $('#list-view').addClass('btn-outline-primary').removeClass('btn-primary');
    renderWrestlerList();
})

$('#list-view').click(e => {
    view = 'list';
    $(e.currentTarget).addClass('btn-primary').removeClass('btn-outline-primary');
    $('#grid-view').addClass('btn-outline-primary').removeClass('btn-primary');
    renderWrestlerList();
})

getWrestlers(this.getWrestlerParams());