"use client";
import _ from 'lodash';

export function filterAttentions(
    attentions, {
        sex, nationality, residency, partnerState, howDidKnowus, yearDidKnowUs,
        attentionsTypes, derivadoA, derivadoDe, formation,
        attentionsReasons, volunteer, projects,
        placeAttention
    }
) {
    console.log({sex})
    const filteredAttentions = attentions
        .filter(filterPartnerBy(sex, 'sex'))
        .filter(filterPartnerBy(nationality, 'nationality'))
        .filter(filterPartnerBy(residency, 'residency'))
        .filter(filterPartnerBy(partnerState, 'partnerState'))
        .filter(filterPartnerBy(howDidKnowus, 'howDidKnowus'))
        .filter(filterPartnerBy(yearDidKnowUs, 'yearDidKnowUs'))
        .filter(multipleFilterAttenntionBy(attentionsTypes, 'TypeAttentions'))
        .filter(filterPartnerBy(derivadoA, 'DerivedTo'))
        .filter(multipleFilterAttenntionBy(derivadoDe, 'DerivedFrom'))
        .filter(multipleFilterAttenntionBy(formation, 'Formation'))
        .filter(multipleFilterAttenntionBy(attentionsReasons, 'AttentionsReasons'))
        .filter(multipleFilterAttenntionBy(volunteer, 'Volunteer'))
        .filter(multipleFilterAttenntionBy(projects, 'Projects'))
        .filter(filterAttenntionBy(placeAttention, 'placeAttention'))
    
    const filteredPartners = _.uniqBy(filteredAttentions.map(a => a.partner), 'id');
    return { filteredAttentions, filteredPartners };
}

const filterPartnerBy = (value, key) => (a) => value.length === 0 ? true : value.includes(a.partner[key].name)
const filterAttenntionBy = (value, key) => (a) => value.length === 0 ? true : value.includes(a[key]?.name)
const multipleFilterAttenntionBy = (filter, key) => (a) => {
    console.log({filter, key, a})
    return filter.map(x => a[key].map(_x => _x.name).includes(x)).filter(x => x === false).length === 0
}
